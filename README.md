# nodejs-template

<h1>사용법</h1>
<pre>
1.git clone repository_name
2.git checkout develop
3.yarn install
4.yarn start
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

<h1>POSTMAN 테스트 방법</h1>
<pre>
1. postman을 설치한다
2. My Workspace 오른쪽에 New/Import 버트중에 Import를 누른다
3. 위에 File/Folder/Link/Raw text/Code Repository중에 Link를 누른다
4. https://www.getpostman.com/collections/cad82d5b8fc0c6bbd838 해당 링크를 붙여넣는다
5. import를 완료한다
</pre>

</pre>

<h1>코드 작성 방법</h1>
<pre>
1. /routes/api를 들어간다
2. menu, store, user, userinfo 폴더 각각에 들어있는 controller.js파일에다가 코드를 정의한다
3. postman으로 잘 작동하는지 판단한다.
*. 필요시 DB 정의해야함. 팀플시 파일이름 변경, 변수이름 변경 상의할 것
</pre>
