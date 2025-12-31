# BlockNote Math Block - KaTeX Integration

A custom BlockNote block that renders mathematical equations using the KaTeX library. Created for the BlockNote open source bounty.

## 🎯 Features

- ✅ Custom `math` block type with KaTeX rendering
- ✅ Full BlockNote schema integration
- ✅ Error handling for invalid LaTeX expressions
- ✅ Beautiful styling with light background and borders
- ✅ TypeScript support
- ✅ Ready-to-use editor example

## 📦 Installation

Install the required dependencies:

```bash
npm install @blocknote/core @blocknote/react @blocknote/mantine katex
```

## 🚀 Quick Start

1. Copy the `MathBlock.tsx` file to your project
2. Import and use the component:

```tsx
import MathEditor from './MathBlock';

function App() {
  return <MathEditor />;
}
```

## 📖 Usage

### Basic Implementation

The `MathBlock.tsx` file contains three main components:

#### 1. **Math Block Definition**

```tsx
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
      // KaTeX rendering logic
    },
  }
);
```

#### 2. **Custom Schema**

```tsx
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    math: MathBlock,
  },
});
```

#### 3. **Editor Instantiation**

```tsx
const editor = useCreateBlockNote({
  schema,
  initialContent: [
    {
      type: "math",
      props: {
        expression: "E = mc^2",
      },
    },
  ],
});
```

### Adding Math Blocks Programmatically

```tsx
editor.insertBlocks(
  [
    {
      type: "math",
      props: {
        expression: "\\frac{a}{b}",
      },
    },
  ],
  editor.getTextCursorPosition().block,
  "after"
);
```

## 📝 LaTeX Examples

Try these LaTeX expressions in your math blocks:

| Expression | LaTeX Code |
|------------|------------|
| Einstein's Equation | `E = mc^2` |
| Quadratic Formula | `\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}` |
| Summation | `\\sum_{i=1}^{n} x_i` |
| Integral | `\\int_{a}^{b} f(x) \\, dx` |
| Matrix | `\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}` |
| Fractions | `\\frac{a}{b}` |
| Square Root | `\\sqrt{x}` |
| Greek Letters | `\\alpha, \\beta, \\gamma, \\delta` |

## 🎨 Styling

The math block comes with default styling:

- Light gray background (`#f8f9fa`)
- Rounded corners (8px)
- Subtle border
- Centered content
- Responsive padding

You can customize the styles by modifying the inline styles in the `render` function.

## 🔧 Customization

### Change Default Expression

Modify the `default` value in the `propSchema`:

```tsx
propSchema: {
  expression: {
    default: "Your LaTeX here",
  },
}
```

### Add More Properties

Extend the `propSchema` to add additional properties like color or size:

```tsx
propSchema: {
  expression: {
    default: "E = mc^2",
  },
  size: {
    default: "normal",
    values: ["small", "normal", "large"],
  },
}
```

## 🐛 Error Handling

The component includes built-in error handling:
- Invalid LaTeX expressions are caught and displayed with an error message
- The editor continues to function even with malformed equations
- Errors are shown in red text for easy identification

## 📚 Resources

- [BlockNote Documentation](https://www.blocknotejs.org/)
- [KaTeX Documentation](https://katex.org/)
- [KaTeX Supported Functions](https://katex.org/docs/supported.html)

## 💡 Integration with Existing Projects

To integrate this math block into your existing BlockNote project:

1. Copy the `MathBlock` definition from `MathBlock.tsx`
2. Add it to your existing schema:

```tsx
import { YourExistingSchema } from './your-schema';

const extendedSchema = YourExistingSchema.extend({
  blockSpecs: {
    math: MathBlock,
  },
});
```

3. Use the extended schema in your editor:

```tsx
const editor = useCreateBlockNote({
  schema: extendedSchema,
  // ... other options
});
```

## 📄 License

This code snippet is provided as a bounty submission for the BlockNote project.

## 🤝 Contributing

Feel free to customize and extend this implementation for your specific needs!
