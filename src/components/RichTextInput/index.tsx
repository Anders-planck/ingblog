import { RichTextEditor, Link, getTaskListExtension } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Color } from '@tiptap/extension-color';
import '@mantine/tiptap/styles.css';
import { TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import { Stack, Input } from '@mantine/core';
import classes from './RichText.module.css';

const lowlight = createLowlight();

// register languages that you are planning to use
lowlight.register({ ts });

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

type RichTextInputProps = {
  withAsterisk?: boolean;
  label?: string;
  description?: string;
  readonly?: boolean;
  handleOnChange?: (value: any) => void;
  error?: string;
  content?: string;
  placeholder?: string;
};

const RichTextInput = ({
  label,
  withAsterisk,
  readonly,
  handleOnChange,
  placeholder,
  error,
  description,
  content,
}: RichTextInputProps) => {
  const editor = useEditor({
    editable: !readonly,
    onUpdate({ editor: eu }) {
      if (handleOnChange) {
        handleOnChange(eu.getHTML());
      }
    },
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      Link,
      Color,
      TextStyle,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder ?? 'write what you think 😉...' }),
      getTaskListExtension(TipTapTaskList),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'test-item',
        },
      }),
    ],
    content,
  });

  return (
    <Stack gap={2}>
      <Input.Wrapper
        data-testid="rich-text-editor"
        {...(!readonly && label && { label })}
        {...(!readonly && description && { description })}
        {...(!readonly && error && { error })}
        {...(!readonly && withAsterisk && { required: true, withAsterisk })}
      >
        <RichTextEditor
          withTypographyStyles
          withCodeHighlightStyles
          editor={editor}
          classNames={classes}
        >
          {!readonly && (
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.CodeBlock />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.TaskList />
                <RichTextEditor.TaskListLift />
                <RichTextEditor.TaskListSink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ColorPicker
                colors={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
              />

              <RichTextEditor.UnsetColor />
            </RichTextEditor.Toolbar>
          )}
          <RichTextEditor.Content style={{ border: 'none' }} />
        </RichTextEditor>
      </Input.Wrapper>
    </Stack>
  );
};

export default RichTextInput;
