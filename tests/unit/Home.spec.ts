import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import { State } from "@/store";

const InputText = jest.fn();
const Calendar = jest.fn();
const Dropdown = jest.fn();
const Button = jest.fn();
const Ripple = jest.fn();

describe("Home.vue", () => {
  const $store = {
    state: State,
    dispatch: jest.fn()
  };

  it("renders Home-Page", () => {
    const wrapper = mount(Home, {
      global: {
        mocks: {
          $store
        },
        components: {
          InputText,
          Calendar,
          Dropdown,
          Button
        },
        directives: {
          Ripple
        }
      }
    });

    expect(wrapper.find("h3").text()).toBe("Todos");
  });

  it("selects the current date", () => {
    const wrapper = mount(Home, {
      global: {
        mocks: {
          $store
        },
        components: {
          InputText,
          Calendar,
          Dropdown,
          Button
        },
        directives: {
          Ripple
        }
      }
    });

    expect(wrapper.find(".timeline-item.active strong:last-child").text()).toBe(
      new Date().getDate().toString()
    );
  });
});
