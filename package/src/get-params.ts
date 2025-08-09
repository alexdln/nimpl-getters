import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";
import { serverGetterInClientComponentError } from "./server-getter-in-client-component-error";
import { INVALID_PARSE, parseParams } from "./utils";

type GetParamsOptions = {
    /**
     * In case of error or segments difference
     * getter will return null
     * (_f.e. `/_not-found` could be at `/it/removed-page` and it would not have any params_)
     */
    ignoreDifferenceError?: true;
    /** Custom pathname (f.e. `["/example/custom"]`). Usable for rewritten pages in SSR or custom functions */
    pathname?: string;
    /** Custom pagePaths list (f.e. `["/example/[slug]/page"]`). Usable for rewritten pages in SSR or custom functions */
    pagePaths?: string[];
};

export const getParams = (options: GetParamsOptions = {}) => {
    serverGetterInClientComponentError("getParams");

    const store = workAsyncStorage.getStore();

    if (!store) return {};

    const { ignoreDifferenceError, pagePaths, pathname } = options;
    const pageConfigurationStore = workAsyncStorage.getStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageStore = workUnitAsyncStorage.getStore() as any;

    if (!pageConfigurationStore) return {};

    const { route } = pageConfigurationStore;
    const pagePath = route;
    const urlPathname = pageStore?.url?.pathname;

    const targetUrlPathname = pathname || urlPathname;

    if (!targetUrlPathname) return {};

    let isInvalid = false;
    try {
        if (pagePaths) {
            for (const userPagePath of pagePaths) {
                const params = parseParams(targetUrlPathname, userPagePath);
                if (params === INVALID_PARSE) {
                    isInvalid ||= true;
                    continue;
                }
                return params || {};
            }
        } else {
            const params = parseParams(targetUrlPathname, pagePath);
            if (params === INVALID_PARSE) {
                isInvalid ||= true;
            } else {
                return params || {};
            }
        }
    } catch {
        isInvalid = true;
    }
    if (isInvalid && !ignoreDifferenceError) {
        const createIssueUrl = new URL("https://github.com/vordgi/nimpl-getters/issues/new");
        createIssueUrl.searchParams.set("title", "Error parsing segments in get-params");
        createIssueUrl.searchParams.set(
            "body",
            `urlPathname: \`${urlPathname}\`;\n\npagePath(s): \`${pagePaths || pagePath}\`;`,
        );
        createIssueUrl.searchParams.append("labels", "bug");
        throw new Error(`Something went wrong. Please create an issue on Github: ${createIssueUrl}`);
    }

    return {};
};
