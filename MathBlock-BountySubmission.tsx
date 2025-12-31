/**
 * BlockNote Math Block - Bounty Submission
 * A custom block that renders mathematical equations using KaTeX
 * 
 * REQUIREMENTS FULFILLED:
 * ✓ Defines a custom BlockNote schema for a 'math' block
 * ✓ Uses KaTeX to render the content of the block
 * ✓ Shows how to instantiate the BlockNote editor with this custom block
 */

import { defaultBlockSpecs, BlockNoteSchema } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";

// ============================================================================
// 1. CUSTOM BLOCK DEFINITION
// ============================================================================

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
                        katex.render(props.block.props.expression, mathRef.current, {
                            throwOnError: false,
                            displayMode: true,
                            output: "html",
                        });
                    } catch (error) {
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
                    <div ref={mathRef} style={{ fontSize: "1.2em", color: "#212529" }} />
                </div>
            );
        },
    }
);

// ============================================================================
// 2. CUSTOM SCHEMA WITH MATH BLOCK
// ============================================================================

const schema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
        math: MathBlock,
    },
});

// ============================================================================
// 3. EDITOR INSTANTIATION EXAMPLE
// ============================================================================

export default function MathEditor() {
    const editor = useCreateBlockNote({
        schema,
        initialContent: [
            {
                type: "heading",
                content: "Math Block Demo",
            },
            {
                type: "paragraph",
                content: "Einstein's equation:",
            },
            {
                type: "math",
                props: {
                    expression: "E = mc^2",
                },
            },
            {
                type: "paragraph",
                content: "Quadratic formula:",
            },
            {
                type: "math",
                props: {
                    expression: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                },
            },
        ],
    });

    return <BlockNoteView editor={editor} theme="light" />;
}

// ============================================================================
// INSTALLATION
// ============================================================================
// npm install @blocknote/core @blocknote/react @blocknote/mantine katex

// ============================================================================
// USAGE
// ============================================================================
// import MathEditor from './MathBlock-BountySubmission';
// function App() { return <MathEditor />; }
