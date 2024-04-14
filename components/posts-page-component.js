import { posts, goToPage, user } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderPostsPageComponent({ appEl, userId }) {
  // TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов:", posts);
  // console.log(userId);
  // console.log(user);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  // console.log(userId);

  const postsHTML = posts
    .map((post) => {
      return `
      <li class="post">
        ${
          !userId
            ? `<div class="post-header" data-user-id="${post.user.id}">
                  <img src="${post.user.imageUrl}" class="post-header__user-image" />
                  <p class="post-header__user-name">${post.user.name}</p>
                </div>`
            : ``
        }
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}" />
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}" />
          </button>
          <p class="post-likes-text">Нравится: <strong>${post.likes.length}</strong></p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">${post.createdAt}</p>
      </li>
      `;
    })
    .join("");

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    ${
      userId
        ? `<div class="posts-user-header">
            <img src="${posts[0].user.imageUrl}" class="post-header__user-image">
            <p class="posts-user-header__user-name">${posts[0].user.name}</p>
          </div>`
        : ``
    }
    <ul class="posts">
      ${postsHTML}
    </ul>
  </div>
  `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
