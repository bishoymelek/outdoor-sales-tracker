import React, { ReactNode, ComponentType } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import i18next from 'i18next';

interface HeaderProps {
  title: string;
}
interface WidgetContainerProps {
  className?: string;
  header: HeaderProps;
  children: ReactNode;
}
function WidgetContainer(props: WidgetContainerProps): JSX.Element {
  const { header, children, className } = props;
  return (
    <Card className={className}>
      {header ? (
        <CardHeader>
          <strong>{i18next.t(header.title)}</strong>
        </CardHeader>
      ) : null}
      <CardBody> {children}</CardBody>
    </Card>
  );
}

function WidgetContainerHoc<P>(
  WrappedComponent: ComponentType<P>
): ComponentType<Omit<P, 'additionalProp'>> {
  return (props: any) => {
    console.log(props);
    return <WrappedComponent sid="siid" psid="psiid" {...props} />;
  };
}
// function WidgetContainerHoc(Component: JSX.Element, props: any): any {
//   console.log(Component.props);

//   return class extends React.Component<any, any> {
//     // eslint-disable-next-line react/static-property-placement
//     static defaultProps = {
//       // sid: Component.defaultProps && Component.defaultProps.sid
//     };

//     render(): JSX.Element {
//       return (
//         <WidgetContainer {...props}>
//           <Component {...props} />
//         </WidgetContainer>
//       );
//     }
//   };
// }

WidgetContainer.defaultProps = {};
export { WidgetContainerHoc };
export default WidgetContainer;
