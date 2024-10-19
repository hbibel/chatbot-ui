import { vi } from "vitest";

export const mockReactI18Next = () => {
  vi.mock(import("react-i18next"), async importOriginal => {
    const mod = await importOriginal();

    const mockedUseTranslation: typeof mod.useTranslation = () => ({
      // TODO: Ignoring TS error for now, since the behavior of `t` is a bit
      // complex and not all possible return types are mocked out right now.
      // @ts-expect-error
      t: str => str,
      // TODO: Ignoring TS error for now, since i18n has way too many
      // properties that are not worth mocking out at this stage.
      // @ts-expect-error
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    });

    return { useTranslation: mockedUseTranslation };
  });
};
