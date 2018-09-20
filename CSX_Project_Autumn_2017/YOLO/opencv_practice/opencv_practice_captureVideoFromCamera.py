import numpy as np
import cv2

cap = cv2.VideoCapture(0)

while(1):
    # Capture frame-by-frame
    ret, frame = cap.read()
    kernel = np.ones((10,5),np.uint8)
    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    dilation = cv2.dilate(frame,kernel,iterations = 1)
    erosion = cv2.erode(frame,kernel,iterations = 1)
    sobelx = cv2.Sobel(frame,cv2.CV_64F,1,0,ksize=5)
    edges = cv2.Canny(frame,40, 100)
    # Display the resulting frame
    cv2.imshow('frame', frame)
    # cv2.imshow('dilatiom', dilation)
    # cv2.imshow('erosion', erosion)
    cv2.imshow('sobelx', sobelx)
    cv2.imshow('edges', edges)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
