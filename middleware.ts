export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/clients/new", "/clients/:id/edit"],
};
