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

    [...]

    handleClickFind = e => {
    const { users, address: { coordinates, placeId }} = this.props;
    const { id: targetUserId } = e.target;
    const { value: { address: {coordinates: destination }}} = filter(users, ['key', targetUserId])[0] || {};
    const origin = { ...coordinates, placeId };

    this.setState({ anchorEl: null, targetUserId });
    
    //const so = [{
      location: { latitude: -12.34, longitude: -38.462 },
      stopover: true
    }]; //

    this.props.getDirections(origin, destination, null);
  }
  } */

 