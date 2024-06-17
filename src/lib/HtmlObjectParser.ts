import { IArticleStructure } from "./interfaces";
import cleanText from "./cleanText";

class HtmlObjectParser {
    private parser: DOMParser;

  constructor() {
    this.parser = new DOMParser();
  }

  parseHtmlToObject(html: string) {

    const doc = this.parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll('h2, h3, p');
    const contentArray: IArticleStructure[] = [];

    elements.forEach((element) => {
      contentArray.push({
        tag: element.tagName.toLowerCase(),
        content: cleanText(element.textContent!),
      });
    });

    return contentArray;
  }

}

export default HtmlObjectParser;