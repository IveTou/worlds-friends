//DEPRECATED

  /* componentDidUpdate() {
    const { address: addressProps } = this.props;
    const { address: addressState } = this.state;

    const coordinatesProps = !isEmpty(addressProps) ?
      transform(addressProps.coordinates, (res, val, key) => {
        res[key] = round(val, 3)
      }) :
      {};

    const coordinatesState = !isEmpty(addressState) ?
      transform(addressState.coordinates, (res, val, key) => {
        res[key] = round(val, 3)
      }) :
      {};
    
    if(isEmpty(addressState) && !isEmpty(addressProps)) {
      this.setState({ address: addressProps }, () => this.props.getDetailedInfo());
    } else if (
      !isEmpty(addressState) && 
      !isEmpty(addressProps) && 
      (JSON.stringify(coordinatesState) !== JSON.stringify(coordinatesProps))
    ) {
      this.setState({ address: addressProps }, () => this.props.getDetailedInfo());
    }
  } */

 