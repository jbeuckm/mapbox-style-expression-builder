import * as react_jsx_runtime from 'react/jsx-runtime';

type ExpressionBuilderProps = {
    properties: string[];
    onChange?: (layers: any) => void;
};
declare const Impl: (context: ExpressionBuilderProps) => react_jsx_runtime.JSX.Element;
declare const ExpressionBuilder: (props: any) => react_jsx_runtime.JSX.Element;

export { ExpressionBuilder, Impl };
