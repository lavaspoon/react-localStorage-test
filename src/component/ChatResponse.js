import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Typewriter from 'typewriter-effect';

// 컴포넌트 정의
const ChatResponse = () => {
    const [typingStage, setTypingStage] = useState(0); // 타이핑 단계 관리 상태

    // 첫 번째 타이핑 효과를 적용할 텍스트 (코드 블럭을 제외한 부분)
    const initialText = `
ChatGPT의 답변입니다.<br>
다음은 코드 예제입니다:<br>
<br>
그리고 다음은 SQL 쿼리 예제입니다:<br>
<br>
위 코드 블럭은 코드 하이라이팅을 제공합니다.
    `;

    // 코드 블럭을 포함한 전체 Markdown 텍스트
    const markdown = `
\`\`\`javascript
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={okaidia}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
\`\`\`

\`\`\`sql
SELECT * FROM users WHERE age > 25 ORDER BY created_at DESC;
\`\`\`
    `;

    // 두 번째 타이핑 효과를 적용할 추가 텍스트
    const additionalText = `
이제 코드 블럭을 확인하실 수 있습니다.
다음 단계로 넘어가겠습니다.
    `;

    return (
        <div>
            <h1>ChatGPT의 답변</h1>
            <div>
                {/* 타이핑 효과 단계에 따라 내용 변경 */}
                {typingStage === 0 ? (
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: false,
                            delay: 50, // 타이핑 속도 조절
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(initialText)
                                .callFunction(() => {
                                    setTypingStage(1); // 첫 번째 타이핑 완료 후 단계 업데이트
                                })
                                .start();
                        }}
                    />
                ) : typingStage === 1 ? (
                    <>
                        {/* 코드 블럭을 렌더링 */}
                        <div
                            dangerouslySetInnerHTML={{ __html: initialText }} // HTML 태그 렌더링
                        />
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={okaidia}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                        {/* 두 번째 타이핑 효과 */}
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: false,
                                delay: 50, // 타이핑 속도 조절
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(additionalText)
                                    .start();
                            }}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default ChatResponse;
