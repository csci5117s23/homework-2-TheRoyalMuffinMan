import { app } from "codehooks-js";
import { crudlify } from "codehooks-crudlify";
import { object, string, boolean, array } from "yup";
import jwtDecode from "jwt-decode";

// TodoItem REST API
const TodoItem = object({
    summary: string().required(),
    state: boolean().required().default(() => false),
    categories: array().of(string()).required(),
    userId: string().required()
});

// Categories REST API
const Categories = object({
    category: string().required(),
    userId: string().required()
});

// General Auth Parsing
const userAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization.replace("Bearer ","");
            const token_parsed = jwtDecode(token);
            req.user_token = token_parsed;
        }
        next();
    } catch (error) {
        next(error);
    } 
}

app.use(userAuth);

// Category Auth Handler
app.use("/categories", (req, res, next) => {
    if (req.method === "POST") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET" || req.method == "DELETE") {
        req.query.userId = req.user_token.sub
    }
    next();
});

// TodoItems Auth Handler
app.use("/todoitems", (req, res, next) => {
    if (req.method === "POST") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub
    }
    next();
});

// TodoItems/ID Auth Handler
app.use("/todoitems/:id", async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub
    const conn = await Datastore.open();
    req.body.userId = userId;
    try {
        const doc = await conn.getOne("todoitems", id)
        if (doc.userId != userId) {
            res.status(403).end();
            return
        }
    } catch (e) {
        res.status(404).end(e);
        return;
    }
    next();
});

crudlify(app, { todoitems: TodoItem, categories: Categories });

// bind to serverless runtime
export default app.init();
