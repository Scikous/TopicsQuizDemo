import { Application, CookieStore, Session, oakCors } from "./deps.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
const store = new CookieStore("loginCookie");

app.use(Session.initMiddleware(store));
app.use(oakCors());
app.use(errorMiddleware);
app.use(authMiddleware);
app.use(sessionMiddleware);

app.use(serveStaticMiddleware);
app.use(renderMiddleware);

app.use(router.routes());

export { app };
