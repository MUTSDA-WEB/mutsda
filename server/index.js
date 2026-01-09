// setup a simple express server 
import {Hono} from 'hono';
const App = new Hono()
App.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Credentials", "true")
  c.header("Access-Control-Allow-Origin", "https://frontend.com")
  await next()
})



const handleDefaultRoute = (c) => c.html(`
    <html>
        <body>
        MUTSDA SERVER
        </body>
        <input type=file name=file/>
    </html>    
`)

App.get("/", handleDefaultRoute)

export default App

