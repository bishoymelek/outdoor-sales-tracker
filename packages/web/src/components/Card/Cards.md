# Cards

## Usage

Sample usage with all available props

```
<CardsComponent
    hasCloseBtn={{
        isVisible: true,
        onClick: this.toggleModal
    }}
    header={{
        isVisible: true,
        title: 'Header!',
        action: true,
    }}
    footer={{
        isVisible: true,
        content: 'Footer!',
    }}
    body={{ 
        content: 'Hi there!'
    }}
    outlineVariant="primary"
    headerBadge={{
        isVisible: true,
        title: 'Success',
        variant: 'success',
    }}
    headerIcon={{
        isVisible: true,
        icon: 'fa fa-check',
    }}
    headerSwitch={{
        isVisible: true,
        variant: 'primary',
    }}
/>
```
