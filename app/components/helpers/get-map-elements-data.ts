const getMapElementsData = (
  mapElement: HTMLElement,
  popupElement: HTMLElement,
  markerElement: HTMLElement
) => {
  const mapElementData = mapElement.getBoundingClientRect();
  const markerElementData = markerElement.getBoundingClientRect();
  const popupElementData = popupElement.getBoundingClientRect();

  const mapHalfWidth = mapElementData.width / 2;
  const mapHalfHeight = mapElementData.height / 2;

  const markerHeight = markerElementData.height;
  const markerWidth = markerElementData.width;
  const markerHalfWidth = markerWidth / 2;
  const markerHalfHeight = markerHeight / 2;

  const popupHeight = popupElementData.height;
  const popupWidth = popupElementData.width;
  const popupHalfWidth = popupElementData.width / 2;
  const popupHalfHeight = popupHeight / 2;

  const topSpace = markerElementData.top - mapElementData.top;
  const bottomSpace =
    mapElementData.top +
    mapElementData.height -
    markerElementData.top -
    markerHeight;
  const spaceAvailableAtTop = topSpace >= popupHeight;
  const spaceAvailableAtBottom = bottomSpace >= popupHeight;

  const leftSpace = markerElementData.left - mapElementData.left;
  const rightSpace =
    mapElementData.left +
    mapElementData.width -
    markerElementData.left -
    markerWidth;
  const spaceAvailableAtLeft = leftSpace >= popupWidth;
  const spaceAvailableAtRight = rightSpace >= popupWidth;

  const leftSpaceX = leftSpace + markerHalfWidth - popupHalfWidth;
  const rightSpaceX = rightSpace + markerHalfWidth - popupHalfWidth;

  const topSpaceY = topSpace - popupHalfHeight + markerHalfHeight;
  const bottomSpaceY = bottomSpace - popupHalfHeight + markerHalfHeight;
  const spaceAvailableAtTopY = topSpaceY >= 0;
  const spaceAvailableAtBottomY = bottomSpaceY >= 0;

  const leftC =
    mapElementData.left +
    mapHalfWidth -
    markerElementData.left +
    markerHalfWidth / 2 -
    popupHalfWidth / 2;
  const bottomC =
    markerElementData.top -
    mapElementData.top +
    markerHeight -
    mapHalfHeight -
    popupHalfHeight;

  return {
    markerHeight,
    topSpace,
    spaceAvailableAtTop,
    spaceAvailableAtBottom,
    spaceAvailableAtLeft,
    spaceAvailableAtRight,
    spaceAvailableAtTopY,
    spaceAvailableAtBottomY,
    leftSpaceX,
    rightSpaceX,
    topSpaceY,
    bottomSpaceY,
    markerHalfWidth,
    markerHalfHeight,
    popupHeight,
    popupHalfWidth,
    popupHalfHeight,
    leftC,
    bottomC,
  };
};

export default getMapElementsData;
