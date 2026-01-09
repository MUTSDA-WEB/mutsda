// setup a simple express server 
import {Hono} from 'hono';
const App = new Hono()
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


