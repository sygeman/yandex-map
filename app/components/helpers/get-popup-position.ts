import getMapElementsData from "./get-map-elements-data";

const getPopupPosition = (
  mapElement: HTMLElement,
  popupElement: HTMLElement,
  markerElement: HTMLElement
) => {
  const {
    markerHeight,
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
    popupHalfWidth,
    popupHalfHeight,
    leftC,
    bottomC,
  } = getMapElementsData(mapElement, popupElement, markerElement);

  // Проверяем возможно ли открыть попап над/под маркером
  if (spaceAvailableAtTop || spaceAvailableAtBottom) {
    // Корректируем смещение по горизонати, если маркер близко к границе карты
    let left = 0;
    if (leftSpaceX < 0) left = -leftSpaceX;
    if (rightSpaceX < 0) left = rightSpaceX;

    // Доступно место над маркером
    if (spaceAvailableAtTop) {
      return { left, bottom: markerHeight };
    }

    // Доступно место под маркером
    return { left, top: 0 };
  }

  // Проверяем возможно ли открыть попап слева/справа от маркера
  if (
    (spaceAvailableAtLeft || spaceAvailableAtRight) &&
    (spaceAvailableAtTopY || spaceAvailableAtBottomY)
  ) {
    let bottom = -popupHalfHeight + markerHalfHeight;

    // Корректируем смещение по вертикали, если маркер близко к границе карты
    if (topSpaceY < 0) {
      bottom = bottom + topSpaceY;
    } else if (bottomSpaceY < 0) {
      bottom = bottom - bottomSpaceY;
    }

    // Доступно место слева от маркера
    if (spaceAvailableAtLeft) {
      const left = -popupHalfWidth - markerHalfWidth;
      return { bottom, left };
    }

    // Доступно место справа от маркера
    const left = popupHalfWidth + markerHalfWidth;
    return { bottom, left };
  }

  // Помещаем попап в центр карты
  return { left: leftC, bottom: bottomC };
};

export default getPopupPosition;
