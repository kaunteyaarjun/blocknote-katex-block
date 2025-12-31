import { defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteSchema, createReactBlockSpec } from "@blocknote/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";

/**
 * Custom Math Block for BlockNote
 * Renders mathematical equations using KaTeX
 */

// Define the Math block specification
const MathBlock = createReactBlockSpec(
  {
    type: "math",
    propSchema: {
      expression: {
        default: "E = mc^2",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const mathRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (mathRef.current) {
          try {
            // Render the LaTeX expression using KaTeX
            katex.render(props.block.props.expression, mathRef.current, {
              throwOnError: false,
              displayMode: true,
              output: "html",
            });
          } catch (error) {
            // If there's an error in the LaTeX, display error message
            mathRef.current.innerHTML = `<span style="color: red;">Invalid LaTeX: ${error}</span>`;
          }
        }
      }, [props.block.props.expression]);

      return (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            margin: "8px 0",
            border: "1px solid #e9ecef",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={mathRef}
            style={{
              fontSize: "1.2em",
              color: "#212529",
            }}
          />
        </div>
      );
    },
  }
);

// Create custom schema with Math block
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    math: MathBlock,
  },
});

/**
 * Example BlockNote Editor with Math Block
 * This component demonstrates how to instantiate the editor with the custom Math block
 */
export default function MathEditor() {
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "heading",
        content: "BlockNote Math Block Demo",
      },
      {
        type: "paragraph",
        content: "This editor supports rendering mathematical equations using KaTeX:",
      },
      {
        type: "math",
        props: {
          expression: "E = mc^2",
        },
      },
      {
        type: "paragraph",
        content: "You can add more complex equations:",
      },
      {
        type: "math",
        props: {
          expression: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        },
      },
      {
        type: "paragraph",
        content: "Summation notation:",
      },
      {
        type: "math",
        props: {
          expression: "\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n",
        },
      },
      {
        type: "paragraph",
        content: "Integrals:",
      },
      {
        type: "math",
        props: {
          expression: "\\int_{a}^{b} f(x) \\, dx",
        },
      },
      {
        type: "paragraph",
        content: "Matrix notation:",
      },
      {
        type: "math",
        props: {
          expression: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
        },
      },
    ],
  });

  return <BlockNoteView editor={editor} theme="light" />;
}

/**
 * Usage Example:
 * 
 * 1. Install dependencies:
 *    npm install @blocknote/core @blocknote/react @blocknote/mantine katex
 * 
 * 2. Import and use in your React app:
 *    import MathEditor from './MathBlock';
 *    
 *    function App() {
 *      return <MathEditor />;
 *    }
 * 
 * 3. To programmatically add a math block:
 *    editor.insertBlocks(
 *      [
 *        {
 *          type: "math",
 *          props: {
 *            expression: "\\frac{a}{b}",
 *          },
 *        },
 *      ],
 *      editor.getTextCursorPosition().block,
 *      "after"
 *    );
 */
