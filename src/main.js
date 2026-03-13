// 引入封装好的组件
import AButton from "./components/AButton.vue";
import Message from "./components/message/index.js";
import ASelectOption from "./components/ASelectOption.vue";
import ASelect from "./components/ASelect.vue";
import ATextarea from "./components/ATextarea.vue";
import ACollapsePanel from "./components/ACollapsePanel.vue";
import ACollapse from "./components/ACollapse.vue";
import AsyncImg from "./components/AsyncImg.vue";
import MarkdownView from "./components/markdown/markdownView.vue";

// 添加静态属性
ASelect.Option = ASelectOption;
ACollapse.Panel = ACollapsePanel;

// 实现按需引入*
export { AButton, Message, ASelectOption, ASelect, ATextarea,  ACollapsePanel, ACollapse, AsyncImg, MarkdownView };
// 批量的引入*
const components = [AButton, Message, ASelectOption, ASelect, ATextarea,  ACollapsePanel, ACollapse, AsyncImg];
const install = function (App, options) {
  components.forEach((component) => {
    App.component(component.name, component);
  });
};
export default { install };