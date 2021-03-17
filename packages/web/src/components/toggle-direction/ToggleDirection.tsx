import React from 'react';
import { Button } from 'reactstrap';
import { withTranslation } from 'react-i18next';

class ToggleDirection extends React.PureComponent<any, {}> {
  customFunc: any;

  constructor(props: any) {
    super(props);
    this.customFunc = props.customFunc;
    this.state = {
      dir: 'rtl'
    };
    this.toggleDir = this.toggleDir.bind(this);
  }

  toggleDir = (): void => {
    const { dir }: any = this.state;
    const { i18n } = this.props;
    if (this.customFunc) {
      this.customFunc();
    }
    if (dir === 'ltr') {
      this.setState({ dir: 'rtl' });
      document.documentElement.setAttribute('dir', 'rtl');
      i18n.changeLanguage('ar');
      document.documentElement.setAttribute('lang', 'ar');
    } else if (dir === 'rtl') {
      this.setState({ dir: 'ltr' });
      document.documentElement.setAttribute('dir', 'ltr');
      i18n.changeLanguage('en');
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  render(): JSX.Element {
    return (
      <>
        <Button className="m-2 toggle-dir" onClick={this.toggleDir}>
          <i className="fa fa-language" />
        </Button>
      </>
    );
  }
}

export default withTranslation()(ToggleDirection);
