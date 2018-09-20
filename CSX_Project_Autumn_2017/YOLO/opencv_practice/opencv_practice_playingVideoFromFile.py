import numpy as np
import cv2

cap = cv2.VideoCapture('/home/pikajiyu/Downloads/vision_api-master/opencv_practice/test.avi')

while(cap.isOpened()):
    ret, frame = cap.read()
    if ret is True:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    else:
        continue
    print(frame.shape)
    cv2.imshow('frame',gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
