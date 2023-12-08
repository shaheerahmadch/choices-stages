import type { Meta, StoryObj } from "@storybook/html";
import type {
  IInputs,
  IOutputs,
} from "../ChoicesStages/generated/ManifestTypes";

import { useArgs } from "@storybook/client-api";

import {
  ComponentFrameworkMockGenerator,
  OptionSetPropertyMock,
  ShkoOnline,
} from "@shko.online/componentframework-mock";

import { ChoicesStages as Component } from "../ChoicesStages/index";

import "../ChoicesStages/css/choices-stages.css";

interface StoryArgs {
  isVisible: boolean;
  isDisabled: boolean;
  choice: number;
}

export default {
  title: "ChoicesStages Component",
  argTypes: {
    isDisabled: { control: "boolean" },
    isVisible: { control: "boolean" },
    choice: {
      options: [0, 1, 2],
      control: {
        type: "select",
        labels: {
          0: "Start",
          1: "Middle",
          2: "End",
        },
      },
    },
  },
  args: {
    isDisabled: false,
    isVisible: true,
    choice: 0,
  },
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      container.style.height = "480px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

const renderGenerator = () => {
  let container: HTMLDivElement;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          Choice: OptionSetPropertyMock,
        },
        container
      );

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;

      const ChoiceMetadata = mockGenerator.metadata.getAttributeMetadata(
        "!CanvasApp",
        "Choice"
      ) as ShkoOnline.PickListAttributeMetadata;

      ChoiceMetadata.OptionSet.Options = {
        [0]: {
          Label: "Start",
          Value: 0,
        },
        [1]: {
          Label: "Middle",
          Value: 1,
        },
        [2]: {
          Label: "End",
          Value: 2,
        },
      };

      mockGenerator.metadata.upsertAttributeMetadata(
        "!CanvasApp",
        ChoiceMetadata
      );

      mockGenerator.context._SetCanvasItems({
        Choice: args.choice,
      });

      mockGenerator.onOutputChanged.callsFake(() => {
        mockGenerator.context._parameters.Choice._Refresh();
        let choice = mockGenerator.context._parameters.Choice.raw as number;
        updateArgs({ choice });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.Choice._SetValue(args.choice);
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const ChoicesStagesComponent = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true } },
} as StoryObj<StoryArgs>;
