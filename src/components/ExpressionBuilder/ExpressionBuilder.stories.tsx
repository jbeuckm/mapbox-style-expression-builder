import { StoryFn, Meta } from '@storybook/react'
import { ExpressionBuilder } from './ExpressionBuilder'

export default {
  title: 'ExpressionBuilder',
  component: ExpressionBuilder,
} as Meta<typeof ExpressionBuilder>

const Template: StoryFn<typeof ExpressionBuilder> = args => <ExpressionBuilder {...args} />

export const ExpressionBuilderTest = Template.bind({})
ExpressionBuilderTest.args = {
  title: 'Default theme',
  theme: 'primary',
  testIdPrefix: 'rating',
}
