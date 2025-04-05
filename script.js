// 头像上传预览
document
  .getElementById("avatarUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileAvatar").src = e.target.result;
        document.getElementById("profileAvatar").style.display = "block";
        document.getElementById("avatarPlaceholder").style.display = "none";

        // 更新顶部的头像
        document.querySelector(".user-avatar img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// 点击占位符触发文件选择
document
  .getElementById("avatarPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("avatarUpload").click();
  });

// 显示修改用户名页面
function showChangeUsernamePage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "block";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示修改密码页面
function showChangePasswordPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "block";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示阅读历史页面
function showReadingHistoryPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "block";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Reading History";
}

// 返回用户资料页面
function showProfilePage() {
  document.getElementById("profilePage").style.display = "block";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("pageTitle").textContent = "Edit Profile";
}

// 显示 My Book 页面
function showMyBookPage() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "block";
  document.getElementById("pageTitle").textContent = "My Book";
}

// 更新用户名
function updateUsername() {
  const newUsername = document.getElementById("newUsername").value;
  if (newUsername) {
    alert("用户名已成功更新为: " + newUsername);
    document.getElementById("usernameDisplay").textContent =
      "User Name: " + newUsername;
    showProfilePage();
  } else {
    alert("请输入新用户名");
  }
  document.getElementById("greetingUser").textContent = "Hi, " + newUsername;
}

// 更新密码
function updatePassword() {
  const verificationCode = document.getElementById("verificationCode").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!verificationCode) {
    alert("请输入验证码");
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    alert("密码长度至少为6位");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  alert("密码已成功更新");
  showProfilePage();
}

// 导航栏点击事件
document.querySelectorAll(".nav-links li").forEach((item) => {
  item.addEventListener("click", function () {
    hideAllPages(); // 隐藏所有页面
    // 移除所有导航项的激活状态
    document.querySelectorAll(".nav-links li").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // 添加当前导航项的激活状态
    this.classList.add("active");

    // 获取对应页面的ID
    const pageId = this.getAttribute("data-page");

    // 隐藏所有页面
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("changeUsernamePage").style.display = "none";
    document.getElementById("changePasswordPage").style.display = "none";
    document.getElementById("readingHistoryPage").style.display = "none";
    document.getElementById("myBookPage").style.display = "none";

    // 显示对应页面并更新页面标题
    switch (pageId) {
      case "home":
        document.getElementById("pageTitle").textContent = "Home";
        break;
      case "user-profile":
        showProfilePage();
        break;
      case "my-book":
        showMyBookPage();
        document.getElementById("pageTitle").textContent = "My Book";
        break;
      case "goal-setting":
        hideAllPages();
        document.getElementById("goalSettingPage").style.display = "block";
        document.getElementById("pageTitle").textContent = "Goal Setting";
        break;
      case "reading-history":
        showReadingHistoryPage();
        document.getElementById("pageTitle").textContent = "Reading History";
        break;
      case "settings":
        document.getElementById("pageTitle").textContent = "Settings";
        break;
    }
  });
});

// 为“Log out”项添加点击事件监听器
document
  .getElementById("logoutItem")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "signin.html";
  });

document.addEventListener("DOMContentLoaded", function () {
  // 获取历史记录容器
  const historyContainer = document.getElementById("history");

  // 渲染历史记录
  function renderHistory(data) {
    historyContainer.innerHTML = ""; // 清空历史记录容器

    if (data.length === 0) {
      // 如果没有历史记录，显示提示信息
      const noHistoryMessage = document.createElement("div");
      noHistoryMessage.classList.add("no-history-message");
      noHistoryMessage.textContent =
        "There is no historical record for the time being.";
      historyContainer.appendChild(noHistoryMessage);
    } else {
      // 如果有历史记录，正常渲染
      data.forEach((item) => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        const dateHeader = document.createElement("h2");
        dateHeader.textContent = item.date;
        historyItem.appendChild(dateHeader);

        const bookList = document.createElement("div");
        bookList.classList.add("book-list");

        item.books.forEach((book) => {
          const bookElement = document.createElement("div");
          bookElement.classList.add("book");

          const bookImage = document.createElement("img");
          bookImage.src = book.cover;
          bookImage.alt = "Book Cover";
          bookElement.appendChild(bookImage);

          const bookTitle = document.createElement("span");
          bookTitle.textContent = book.title;
          bookElement.appendChild(bookTitle);

          bookList.appendChild(bookElement);
        });

        historyItem.appendChild(bookList);
        historyContainer.appendChild(historyItem);
      });
    }
  }

  // 从服务器获取历史记录
  function fetchHistory() {
    fetch("/api/history") // 假设您的API端点是'/api/history'
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        renderHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        const noHistoryMessage = document.createElement("div");
        noHistoryMessage.classList.add("no-history-message");
        noHistoryMessage.textContent = "Failed to load history.";
        historyContainer.appendChild(noHistoryMessage);
      });
  }

  // 筛选历史记录
  function filterHistory() {
    const filterValue = document.getElementById("filter-select").value;
    let filteredData = historyData;

    switch (filterValue) {
      case "week":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
        });
        break;
      case "month":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return date >= new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
        });
        break;
      case "year":
        filteredData = historyData.filter((item) => {
          const date = new Date(item.date);
          return (
            date >= new Date(new Date().getTime() - 365 * 24 * 3600 * 1000)
          );
        });
        break;
      default:
        filteredData = historyData;
    }

    // 按时间顺序排序
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 渲染筛选后的数据
    renderHistory(filteredData);
  }

  // 监听筛选器的变化
  document
    .getElementById("filter-select")
    .addEventListener("change", filterHistory);

  // 初始化渲染全部历史记录
  fetchHistory();

  // 监听搜索按钮的点击事件
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
      const historyItems = document.querySelectorAll(".history-item");

      // 默认显示所有历史记录
      historyItems.forEach((item) => {
        item.style.display = "block";
      });

      // 如果搜索框有内容，则进一步筛选
      if (searchInput) {
        historyItems.forEach((item) => {
          const bookTitles = Array.from(item.querySelectorAll("span")).map(
            (el) => el.textContent.toLowerCase()
          );
          if (bookTitles.some((title) => title.includes(searchInput))) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
});

// 显示创建阅读日志表单
function showReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "flex";
}

// 隐藏创建阅读日志表单
function hideReadingLogForm() {
  document.getElementById("readingLogForm").style.display = "none";
}

// 创建阅读日志
function createReadingLog() {
  const bookTitle = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const readingDate = document.getElementById("readingDate").value;
  const bookReview = document.getElementById("bookReview").value;
  const bookCover = document.getElementById("bookCoverPreview").src;

  if (!bookTitle || !bookAuthor || !readingDate) {
    alert("请填写书名、作者和阅读日期");
    return;
  }

  // 创建书籍卡片
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.dataset.title = bookTitle;
  bookCard.dataset.author = bookAuthor;
  bookCard.dataset.date = readingDate;
  bookCard.dataset.review = bookReview;
  bookCard.dataset.cover = bookCover;
  bookCard.innerHTML = `
    <img src="${
      bookCover || "https://via.placeholder.com/200"
    }" alt="${bookTitle}">
    <div class="book-info">
      <div class="book-title">${bookTitle}</div>
      <div class="book-author">${bookAuthor}</div>
    </div>
  `;

  // 添加点击事件
  bookCard.addEventListener("click", function () {
    showReadingDetails(
      this.dataset.title,
      this.dataset.author,
      this.dataset.date,
      this.dataset.review
    );
  });

  // 获取书籍网格
  const favouriteBooks = document.getElementById("favouriteBooks");

  // 将按钮移到最后
  const addBookBtn = document.querySelector(".add-book-btn");
  if (addBookBtn) {
    favouriteBooks.appendChild(addBookBtn);
  }

  // 添加书籍卡片
  favouriteBooks.insertBefore(bookCard, addBookBtn);

  // 将数据存储到 localStorage
  const bookData = {
    title: bookTitle,
    author: bookAuthor,
    date: readingDate,
    review: bookReview,
    cover: bookCover,
  };
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  books.push(bookData);
  localStorage.setItem("books", JSON.stringify(books));

  // 隐藏表单并重置输入
  hideReadingLogForm();
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("readingDate").value = "";
  document.getElementById("bookReview").value = "";
  document.getElementById("bookCoverPreview").style.display = "none";
  document.getElementById("uploadPlaceholder").style.display = "flex";
}

// 显示阅读记录详情
function showReadingDetails(title, author, date, review) {
  document.getElementById("detailTitle").textContent = title;
  document.getElementById("detailAuthor").textContent = `Author: ${author}`;
  document.getElementById("detailDate").textContent = `Reading Date: ${date}`;
  document.getElementById("detailReview").textContent = `Review: ${review}`;
  document.getElementById("readingDetails").style.display = "flex";
}

// 关闭阅读记录详情
function closeReadingDetails() {
  document.getElementById("readingDetails").style.display = "none";
}

// 上传书籍封面
document
  .getElementById("bookCoverUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("bookCoverPreview").src = e.target.result;
        document.getElementById("bookCoverPreview").style.display = "block";
        document.getElementById("uploadPlaceholder").style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

// 点击加号按钮触发文件选择
document
  .getElementById("uploadPlaceholder")
  .addEventListener("click", function () {
    document.getElementById("bookCoverUpload").click();
  });

//目标选择更新
// 在现有JavaScript末尾添加以下代码
// 目标管理功能
let currentGoalId = null;
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// 初始化测量单位选择
document.querySelectorAll('.measurement-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.measurement-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// 创建新目标
function createNewGoal() {
  const goal = {
    id: Date.now(),
    name: document.getElementById('goalName').value,
    unit: document.querySelector('.measurement-btn.active').dataset.unit,
    target: parseInt(document.getElementById('targetValue').value),
    start: document.getElementById('startDate').value,
    end: document.getElementById('endDate').value,
    cover: document.getElementById('goalCoverPreview').style.backgroundImage || '',
    progress: 0,
    completed: false
  };

  if (!validateGoal(goal)) return;

  goals.push(goal);
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
  clearGoalForm();
}

function validateGoal(goal) {
  if (!goal.name || !goal.target || !goal.start || !goal.end) {
    alert('Please fill all required fields');
    return false;
  }
  if (new Date(goal.start) > new Date(goal.end)) {
    alert('End date cannot be earlier than start date');
    return false;
  }
  return true;
}

// 渲染目标看板
function renderGoals() {
  const grid = document.getElementById('goalGrid');
  grid.innerHTML = '';

  goals.forEach(goal => {
    const progressPercent = Math.min(Math.round((goal.progress / goal.target) * 100), 100);
    const card = document.createElement('div');
    card.className = `goal-card ${goal.completed ? 'completed' : ''}`;
    card.innerHTML = `
      <button class="delete-goal" onclick="deleteGoal(${goal.id})"><i class="fas fa-times"></i></button>
      <div class="goal-cover" style="background-image: url(${goal.cover})"></div>
      <h4>${goal.name}</h4>
      <p>Target: ${goal.target} ${goal.unit}</p>
      <p>Duration: ${formatDate(goal.start)} - ${formatDate(goal.end)}</p>
      <div class="progress-ring" onclick="showProgressModal(${goal.id})" 
           style="background: conic-gradient(#a262ad ${progressPercent}%, #e6d0ef ${progressPercent}% 100%)">
        <div class="progress-percent">${progressPercent}%</div>
      </div>
      ${goal.completed ? '<i class="fas fa-check-circle checkmark"></i>' : ''}
    `;
    grid.appendChild(card);
  });
}

// 删除目标
function deleteGoal(id) {
  if (!confirm('Are you sure to delete this goal?')) return;
  goals = goals.filter(goal => goal.id !== id);
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
}

// 更新进度
function showProgressModal(id) {
  currentGoalId = id;
  document.getElementById('progressModal').style.display = 'flex';
}

function updateProgress() {
  const goal = goals.find(g => g.id === currentGoalId);
  const newProgress = parseInt(document.getElementById('currentProgress').value);
  
  if (newProgress > goal.target || newProgress < 0) {
    alert(`Please enter a value between 0 and ${goal.target}`);
    return;
  }

  goal.progress = newProgress;
  goal.completed = newProgress >= goal.target;
  localStorage.setItem('goals', JSON.stringify(goals));
  closeProgressModal();
  renderGoals();
}

function closeProgressModal() {
  document.getElementById('progressModal').style.display = 'none';
  currentGoalId = null;
  document.getElementById('currentProgress').value = '';
}

// 封面图片上传
document.getElementById('goalCoverUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('goalCoverPreview').style.backgroundImage = `url(${event.target.result})`;
    };
    reader.readAsDataURL(file);
  }
});

// 辅助函数
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function clearGoalForm() {
  document.getElementById('goalName').value = '';
  document.getElementById('targetValue').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  document.getElementById('goalCoverPreview').style.backgroundImage = '';
}
function hideAllPages() {
  document.getElementById("profilePage").style.display = "none";
  document.getElementById("changeUsernamePage").style.display = "none";
  document.getElementById("changePasswordPage").style.display = "none";
  document.getElementById("readingHistoryPage").style.display = "none";
  document.getElementById("myBookPage").style.display = "none";
  document.getElementById("goalSettingPage").style.display = "none";
  // 添加其他需要隐藏的页面...
}
// 初始化时渲染目标
document.addEventListener('DOMContentLoaded', renderGoals);