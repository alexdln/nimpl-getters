import { getParams } from "@nimpl/getters/get-params";

export default function NotFound() {
    const params = getParams({
        ignoreDifferenceError: true,
        pagePaths: ["/specific/[locale]/[...subpaths]/page", "/[locale]/base/[...subpaths]/page"],
    });

    return (
        <div id="not-found">
            <p id="get-params">{JSON.stringify(params)}</p>
        </div>
    );
}

export const dynamic = "force-dynamic";
