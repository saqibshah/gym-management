"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgGym, CgMenuRight } from "react-icons/cg";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "./components";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Clients", href: "/clients" },
  { label: "Trainers", href: "/trainers" },
  { label: "Group Classes", href: "/group-classes" },
  { label: "Payments", href: "/payments" },
];

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <CgGym />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" gap="3">
            <AuthStatus />
            <MobileMenu />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const MobileMenu = () => {
  const currentPath = usePathname();
  return (
    <Box className="block md:!hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <CgMenuRight />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {links.map((link) => (
            <DropdownMenu.Item asChild key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "!text-zinc-900": link.href === currentPath,
                  "nav-link": true,
                })}
              >
                {link.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  return (
    <ul className="space-x-6 hidden md:flex">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "!text-zinc-900": link.href === currentPath,
              "nav-link": true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
