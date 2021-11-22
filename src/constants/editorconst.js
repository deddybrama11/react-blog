import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import axios from "axios";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    /**
     * This property will override the common settings
     * That means that this tool will have only Marker and Link inline tools
     * If 'true', the common settings will be used.
     * If 'false' or omitted, the Inline Toolbar wont be shown
     */
    inlineToolbar: ["marker", "link"],
    config: {
      placeholder: "Header",
    },
    shortcut: "CMD+SHIFT+H",
  },
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          const instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_IMAGE_URL}`,
          });

          const formData = new FormData();
          formData.append("image", file);

          const response = await instance
            .post("/image/upload", formData)
            .then((response) => {
              console.log(response.data.data.location);
              let a = {
                success: 1,
                file: {
                  url: response.data.data.location,
                },
              };
              return a;
            })
            .catch((err) => {
              console.log(err);
            });
          return response;
        },
      },
    },
  },
  raw: Raw,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
