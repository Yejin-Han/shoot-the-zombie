<h1>Shoot-the-zombie</h1>
<p>
모바일용 좀비잡기 게임입니다.
<br>
간단한 두더지 게임을 응용하여 여러가지 조건을 더하고 3개의 스테이지를 구현하는 등 다채로운 변화를 주었습니다.
어렸을 때 해 본 플래시게임을 모티브로 활용하여 그 시절 느낌이 나는 게임을 구현하고자 했습니다.
<br>
<br>
setInterval, setTimeout과 random함수, clickable 등의 상태변수의 활용을 확인할 수 있습니다.
</p>
<a href="https://yejin-han.github.io/shoot-the-zombie/">Shoot-the-zombie 바로가기</a>
<br>
<br>
<br>
<h2>🗓️ 제작 기간</h2>
> 2022. 11. 16. ~ 2022. 11. 29.
<h2>📸 완성 화면</h2>
<table align="center">
  <tr>
    <td width="33%"><img alt="index" src="/capture/index.jpg" /></td>
    <td width="33%"><img alt="howtoplay" src="/capture/howto.jpg" /></td>
    <td width="33%"><img alt="play" src="/capture/play.jpg" /></td>
  </tr>
</table>
<h2>🛠 활용 tool 및 language</h2>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>jQuery</li>
  <li>VS Code</li>
  <li>Photoshop</li>
</ul>
<br>
<h2>📚 화면 구조</h2>
<ol>
  <li>index.html -> #intro, #guide</li>
  <li>stage.html</li>
  <li>next_stage.html</li>
  <li>failure.html</li>
  <li>success.html</li>
</ol>
<h2>📋 구현 기능</h2>
<h3>stage.html</h3>
  <table align="center">
    <tr>
      <td width="50%"><img alt="플레이화면" src="/capture/play.jpg" /></td>
      <td width="50%"><img alt="연타" src="/capture/roll.jpg" /></td>
    </tr>
  </table>
  <ul>
    <li>우선 랜덤으로 11개의 창문+문 중 세 곳을 선택해서 검은 실루엣을 보여줍니다.</li>
    <li>이후 그 실루엣들 중 랜덤으로 한 곳에서 좀비, 사람 혹은 아이템이 나타납니다.</li>
    <li>좀비를 클릭하면 하단의 카운터가 -1, 아이템인 시계를 클릭하면 +5초, 하트를 클릭하면 목숨이 +1 되며, 만약 실수로 사람을 클릭하면 목숨이 -1 됩니다.</li>
    <li>좀비의 종류는 스테이지 1에 하나, 스테이지 2에 셋, 스테이지 3에 다섯이 되며, 좀비가 착용하고 있는 갑옷의 등급에 따라 클릭해야하는 횟수가 달라집니다. 또한, 사람의 종류 역시 스테이지 1에 넷, 2에 그대로, 3에 여섯이 됩니다.</li>
    <li>문에서는 커다란 좀비가 등장하는데, 이 경우는 2초 안에 6번 이상 연타하지 못하면 목숨을 잃게 됩니다.</li>
    <li>로컬스토리지에 스테이지 정보를 저장하여 스테이지 변화를 감지합니다.</li>
  </ul>
<h3>result</h3>
  <table align="center">
    <tr>
      <td width="33%"><img alt="실패" src="/capture/failure.jpg" /></td>
      <td width="33%"><img alt="다음스테이지" src="/capture/next.jpg" /></td>
      <td width="33%"><img alt="성공" src="/capture/success.jpg" /></td>
    </tr>
  </table>
  <ul>
    <li>제한시간안에 좀비 10마리를 잡지 못하거나 목숨이 다하면 스테이지 실패, failure.html로 넘어갑니다.</li>
    <li>스테이지 1, 스테이지 2에서 제한시간안에 좀비 잡기에 성공하면 next_stage.html로 넘어갑니다.</li>
    <li>최종적으로 스테이지 3에서 성공하면 success.html로 넘어갑니다.</li>
  </ul>
