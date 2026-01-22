import client from "../helpers/prismaClient";

export default async function checkSignupInfo(c, next) {
  const signUpBody = await c.req.json();
  c.set("info", signUpBody);
  checkUsername(c, next);
  checkEmail(c, next);
  await next();
}

async function checkEmail(c, next) {
  const { email } = c.get("info");
  const em = await client.user.findUnique({
    where: { email },
  });
  if (em) {
    return c.json(
      {
        error: "Email already exists",
      },
      400,
    );
  }
  await next();
}

async function checkUsername(c, next) {
  const { username } = c.get("info");
  const un = await client.user.findUnique({
    where: { userName: username },
  });
  if (un) {
    return c.json(
      {
        error: "username already exists",
      },
      400,
    );
  }
  await next();
}
