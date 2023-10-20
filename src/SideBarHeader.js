export default function SideBarHeader({ $target }) {
  const $header = document.createElement("div");
  $header.className = "header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <div class="header_profile">
      <div class="header_profile_icon">
        😃
      </div>
      <div class="header_profile_name">
        예진's 자체제작 노션
      </div>
    </div>
    <div class="header_fadein">
      <<
    </div>
    `;
    // $header.style =
    //   "color: rgb(55, 53, 47); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis";

    $header.addEventListener("mouseover", () => {
      $header.querySelector(".header_fadein").style.opacity = "1";
      $header.querySelector(".header_fadein").style.background =
        "rgba(55, 53, 47 ,0.08)";
    });
    $header.addEventListener("mouseout", () => {
      $header.querySelector(".header_fadein").style.opacity = "0";
    });
  };
  this.render();
}
