import React, { PureComponent } from 'react'
import Box, { splitBoxProps } from 'ui-box'
import { Icon, TextInput, withTheme, StackingOrder } from 'evergreen-ui';

class SearchInput extends PureComponent {
  static propTypes = {
    ...TextInput.propTypes
  }

  static defaultProps = {
    height: 32,
    appearance: 'default'
  }

  render() {
    const { setRef, onChange, theme, appearance, disabled, height, ...props } = this.props
    const { matchedProps, remainingProps } = splitBoxProps(props)
    const { width } = matchedProps
    const iconSize = theme.getIconSizeForInput(height)

    return (
      <Box
        position="relative"
        display="inline-flex"
        height={height}
        {...matchedProps}
      >
        <Box
          height={height}
          width={height}
          pointerEvents="none"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            icon="search"
            color="white"
            zIndex={StackingOrder.FOCUSED + 1}
            size={iconSize}
          />
        </Box>
        <TextInput
          height={height}
          paddingLeft={height}
          appearance={appearance}
          disabled={disabled}
          width={width}
          background='rgba(13, 19, 36, .3)'
          color='rgb(150, 152, 161)'
          borderRadius='20px'
          border='none'
          onChange={onChange}
          innerRef={setRef}
          {...remainingProps}
        />
      </Box>
    )
  }
}

export default withTheme(SearchInput)
