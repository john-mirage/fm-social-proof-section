import "./main.css";

import reviews from "@data/reviews.json";
import testimonials from "@data/testimonials.json";

import WebReview from "./components/web-review";
import WebTestimonial from "./components/web-testimonial";

customElements.define("web-review", WebReview, { extends: "li" });
customElements.define("web-testimonial", WebTestimonial, { extends: "li" });

const reviewListElement = <HTMLUListElement>(
  document.getElementById("review-list")
);
const testimonialListElement = <HTMLUListElement>(
  document.getElementById("testimonial-list")
);

reviewListElement.replaceChildren(
  ...reviews.map((review) => {
    const webReview = <WebReview>(
      document.createElement("li", { is: "web-review" })
    );
    webReview.dataCompany = review.company;
    webReview.dataValue = String(review.value);
    return webReview;
  })
);

testimonialListElement.replaceChildren(
  ...testimonials.map((testimonial) => {
    const webTestimonial = <WebTestimonial>(
      document.createElement("li", { is: "web-testimonial" })
    );
    webTestimonial.dataPicture = testimonial.picture;
    webTestimonial.dataName = testimonial.name;
    webTestimonial.dataStatus = testimonial.status;
    webTestimonial.dataMessage = testimonial.message;
    return webTestimonial;
  })
);
