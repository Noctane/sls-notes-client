import React, { useState, useRef } from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
// hooks
import useForm from '../../hooks/useForm';
// lib
import { s3Upload } from '../../lib/aws';
import validate from '../../lib/validationRules';
// components
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import config from '../../config';
import { onError } from '../../lib/errorHandler';

export default function NewNote() {
  const history = useHistory();
  const fileInput = useRef<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: INote = {
    content: '',
    attachment: null,
  };
  // tmp note type
  function createNote(note: INote) {
    return API.post('notes', '/notes', {
      body: note,
    });
  }

  const handleSubmit = async () => {
    if (
      values.attachment &&
      values.attachment.size > config.MAX_ATTACHMENT_SIZE
    ) {
      alert(
        `File too large, it must be smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB`
      );
      return;
    }
    setIsLoading(true);

    try {
      const attachmentFile = values.attachment
        ? await s3Upload(values.attachment)
        : null;

      await createNote({ content: values.content, attachment: attachmentFile });
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const { values, handlers, errors } = useForm(
    handleSubmit,
    validate,
    initialValues
  );

  return (
    <div className="container mx-auto pt-24 text-center">
      <h1 className="text-3xl font-medium text-gray-700">Create note</h1>
      <div className="rounded border w-2/5 p-8 text-left mx-auto mt-8">
        <form onSubmit={handlers.handleSubmit} className="space-y-6">
          <FormField
            value={values.content}
            onChange={handlers.handleChange}
            onBlur={handlers.handleBlur}
            onFocus={handlers.handleFocus}
            type="textarea"
            name="content"
            errors={errors}
            isRequired
            labelMessage="Content"
          />
          <FormField
            onFileChange={handlers.handleFileChange}
            onBlur={handlers.handleBlur}
            onFocus={handlers.handleFocus}
            type="file"
            name="attachment"
            errors={errors}
            labelMessage="Attachment"
            inputRef={fileInput}
          />
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || isLoading}
            label="Submit"
            busy={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
