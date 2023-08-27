import JSONViewer from "../components/JSONViewer.svelte";

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

interface JSONPageContext {
  data: any;
  raw: string;
  element: HTMLElement;
}

type JSONPageContextResult =
  | { success: true; value: JSONPageContext }
  | { success: false };

function extractJSONPageContext(): JSONPageContextResult {
  if (document.contentType !== "application/json") {
    return { success: false };
  }

  const { body } = document;
  const preElements = body.getElementsByTagName("pre");
  if (preElements.length === 0) {
    return { success: false };
  }

  if (preElements.length > 1) {
    console.warn(
      "[json-ext] Found more than one <pre> element, is something wrong?",
    );
  }

  const json = preElements[0].innerText;

  return {
    success: true,
    value: {
      data: JSON.parse(json),
      raw: json,
      element: preElements[0],
    },
  };
}

const jsonResult = extractJSONPageContext();
if (jsonResult.success) {
  jsonResult.value.element.hidden = true;

  new JSONViewer({
    target: document.body,
    props: { data: jsonResult.value.data, raw: jsonResult.value.raw },
  });
}
