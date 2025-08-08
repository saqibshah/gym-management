export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/clients/new",
    "/clients/:id/edit",
    "/trainers/new",
    "/trainers/:id/edit",
    "/group-classes/new",
    "/group-classes/:id/edit",
  ],
};
