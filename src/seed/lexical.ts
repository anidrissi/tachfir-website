/**
 * Constructeurs Lexical compacts pour le seed : produisent l'état
 * sérialisé attendu par l'éditeur richText de Payload.
 */

type TextNode = {
  type: 'text';
  text: string;
  detail: number;
  format: number;
  mode: 'normal';
  style: '';
  version: 1;
};

type Node = Record<string, unknown>;

function text(value: string, format = 0): TextNode {
  return { type: 'text', text: value, detail: 0, format, mode: 'normal', style: '', version: 1 };
}

const base = { direction: null, format: '', indent: 0, version: 1 } as const;

/** Paragraphe. **gras** supporté via segments alternés : p('avant ', b('gras'), ' après') */
export function p(...parts: Array<string | TextNode>): Node {
  return {
    ...base,
    type: 'paragraph',
    children: parts.map((part) => (typeof part === 'string' ? text(part) : part)),
    textFormat: 0,
    textStyle: '',
  };
}

/** Segment en gras à insérer dans p(). */
export function b(value: string): TextNode {
  return text(value, 1);
}

export function h2(title: string): Node {
  return { ...base, type: 'heading', tag: 'h2', children: [text(title)] };
}

export function h3(title: string): Node {
  return { ...base, type: 'heading', tag: 'h3', children: [text(title)] };
}

export function ul(items: string[]): Node {
  return {
    ...base,
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    children: items.map((item, i) => ({
      ...base,
      type: 'listitem',
      value: i + 1,
      children: [text(item)],
    })),
  };
}

export function ol(items: string[]): Node {
  return {
    ...base,
    type: 'list',
    listType: 'number',
    tag: 'ol',
    start: 1,
    children: items.map((item, i) => ({
      ...base,
      type: 'listitem',
      value: i + 1,
      children: [text(item)],
    })),
  };
}

export function quote(value: string): Node {
  return { ...base, type: 'quote', children: [text(value)] };
}

/** Document complet. */
export function doc(...children: Node[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  };
}
