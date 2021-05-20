# nodejs-template
<h1>사용법</h1>
<pre>
1.git clone repository_name
2.yarn install
3.yarn start
</pre>

<h1>코드 작성전 유의사항</h1>
<pre>
1. vscode 설치
2. vscode market에서 prettierrc 설치
3. vscode market에서 eslintrc 설치
</pre>

<h1>저장할때마다 코드 자동 prettieerc & eslintrc 적용하는 방법</h1>
<pre>
1. VS Code에서 settings.json파일을 들어간다(윈도우, 리눅스에서는 Ctrl + ,, 맥에서는 Cmd + , 를 누르고 오른쪽 위에 작은 문서 아이콘 누르면 settings.json 볼 수 있음)
2. 아래 내용을 붙여넣기

{
    // Set the default
    "editor.formatOnSave": false,
    // Enable per-language
    "[javascript]": {
        "editor.formatOnSave": true
    },
    "editor.codeActionsOnSave": {
        // For ESLint
        "source.fixAll.eslint": true
    }
}
</pre>

