import "./main.css";

import reviews from "@data/reviews.json";
import testimonials from "@data/testimonials.json";

const reviewListElement = <HTMLUListElement>(
  document.getElementById("review-list")
);
const testimonialListElement = <HTMLUListElement>(
  document.getElementById("testimonial-list")
);

const reviewTemplate = <HTMLTemplateElement>(
  document.getElementById("template-review")
);
const testimonialTemplate = <HTMLTemplateElement>(
  document.getElementById("template-testimonial")
);

const reviewElements = reviews.map((review) => {
  const reviewElement = <HTMLLIElement>reviewTemplate.content.cloneNode(true);
  const nameElement = <HTMLSpanElement>(
    reviewElement.querySelector('[data-js="company"]')
  );
  const valueElement = <HTMLSpanElement>(
    reviewElement.querySelector('[data-js="value"]')
  );
  const ratingElement = <HTMLDivElement>(
    reviewElement.querySelector('[data-js="rating"]')
  );
  nameElement.textContent = review.company;
  valueElement.textContent = String(review.value);
  ratingElement.classList.add(`rating--${String(review.value)}-of-5`);
  return reviewElement;
});

const testimonialElements = testimonials.map((testimonial) => {
  const testimonialElement = <HTMLLIElement>(
    testimonialTemplate.content.cloneNode(true)
  );
  const imageElement = <HTMLImageElement>(
    testimonialElement.querySelector('[data-js="image"]')
  );
  const nameElement = <HTMLHeadingElement>(
    testimonialElement.querySelector('[data-js="name"]')
  );
  const statusElement = <HTMLParagraphElement>(
    testimonialElement.querySelector('[data-js="status"]')
  );
  const messageElement = <HTMLParagraphElement>(
    testimonialElement.querySelector('[data-js="message"]')
  );
  imageElement.src = testimonial.picture;
  imageElement.alt = `${testimonial.name} profile picture`;
  nameElement.textContent = testimonial.name;
  statusElement.textContent = testimonial.status;
  messageElement.textContent = testimonial.message;
  return testimonialElement;
});

reviewListElement.replaceChildren(...reviewElements);
testimonialListElement.replaceChildren(...testimonialElements);
