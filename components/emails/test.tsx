import * as React from 'react';

interface EmailTemplateProps {
  action_url: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  action_url,
}) => (
  <div>
    <h1>Welcome to ExamTimer!</h1>
    <p>
      Activate your account by clicking the link below: <br />
      {action_url}
    </p>
  </div>
);
