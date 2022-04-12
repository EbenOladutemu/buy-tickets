import { shallowMount } from "@vue/test-utils";
import HeaderSection from "@/components/HeaderSection.vue";

describe("HeaderSection.vue", () => {
  it("Check text", () => {
    const wrapper = shallowMount(HeaderSection);
    const headerText = wrapper.find("span").text();
    expect(headerText).toBe("Events");
  });
});
