"use client";

import LiveblocksProvider from "@liveblocks/yjs";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withYjs, YjsEditor } from "@slate-yjs/core";
import * as Y from "yjs";
import { useRoom } from "../../liveblocks.config";
import styles from "./CollaborativeEditor.module.css";

export function CollaborativeEditor() {
  const room = useRoom();
  const [connected, setConnected] = useState(false);
  const [sharedType, setSharedType] = useState();
  const [provider, setProvider] = useState();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    const sharedDoc = yDoc.get("slate", Y.XmlText);
    yProvider.on("sync", setConnected);

    setSharedType(sharedDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.off("sync", setConnected);
      yProvider?.destroy();
    };
  }, [room]);

  if (!connected || !sharedType || !provider) {
    return <div>Loading…</div>;
  }

  return <SlateEditor sharedType={sharedType} />;
}

const emptyNode = {
  children: [{ text: "" }],
};

function SlateEditor({ sharedType }) {
  const editor = useMemo(() => {
    const e = withReact(withYjs(createEditor(), sharedType));

    // Ensure editor always has at least 1 valid child
    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(editor, emptyNode, { at: [0] });
    };

    return e;
  }, []);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <div className="block">
      <h2 className="text-2xl font-bold m-2">Collab Tool</h2>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <Slate editor={editor} initialValue={[emptyNode]}>
            <Editable className={styles.editor} placeholder="Start typing here…" />
          </Slate>
        </div>
      </div>
    </div>
  );
}