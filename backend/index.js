import { app } from "codehooks-js";
import { crudlify } from "codehooks-crudlify";
import { object, string, boolean, array } from "yup";

// Use Crudlify to create a REST API for any collection
const TodoItem = object({
    summary: string().required(),
    state: boolean().required().default(() => false),
    categories: array().of(string()).optional()
});

const Categories = object({
    category: string().required()
});

crudlify(app, { todoitems: TodoItem, categories: Categories });

// bind to serverless runtime
export default app.init();
