const spaceId = "osouiuvyysdi";
const accessToken = "bZwrtZ3I8MqIAAvVP0CA8bJtHevPZQbyTCkofH4Yw7Q";
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=blogPost&include=1`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const blogContainer = document.getElementById("blog-container");
    const socialContainer = document.getElementById("social-container");

    data.items.forEach((item) => {
      const { title, body, image } = item.fields;
      const imgId = image?.sys.id;
      const imgUrl = imgId
        ? "https:" +
          data.includes.Asset.find((a) => a.sys.id === imgId).fields.file.url
        : "";

      // Blog style card
      const blogCard = document.createElement("div");
      blogCard.className = "card";
      blogCard.innerHTML = `
        <img src="${imgUrl}" alt="${title}" />
        <h3>${title}</h3>
        <p>${body?.content?.[0]?.content?.[0]?.value || ""}</p>
      `;
      blogContainer.appendChild(blogCard);

      // Social preview style card
      const socialCard = document.createElement("div");
      socialCard.className = "social-card";
      socialCard.innerHTML = `
        <img src="${imgUrl}" alt="${title}" />
        <div>
          <h4>${title}</h4>
          <p>${
            body?.content?.[0]?.content?.[0]?.value.substring(0, 60) || ""
          }...</p>
        </div>
      `;
      socialContainer.appendChild(socialCard);
    });
  });
