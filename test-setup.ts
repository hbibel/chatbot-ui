import { installGlobals } from "@remix-run/node";

import "@testing-library/jest-dom/vitest";

import { mockReactI18Next } from "@/utils/test/mock-i18next";
import { mockZustand } from "@/utils/test/mock-zustand";

installGlobals();

mockReactI18Next();
mockZustand();
