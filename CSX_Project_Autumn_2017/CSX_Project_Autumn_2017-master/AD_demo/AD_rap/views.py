from django.shortcuts import render
from django.http import Http404, HttpResponse
from pypinyin import pinyin, lazy_pinyin, Style
import pandas as pd
import pickle
import string
import nltk
import re
import itertools
import jieba
import json

# dataset
# 讀取基本字典
with open('./AD_rap/static/pinin_class_dict.pickle', 'rb') as handle:
    pinin_class_dict = pickle.load(handle)


# 拼音查找用
class PininFinder():
    def __init__(self):
        pass

    def check_pinin_word(self, input_string, default_dict=pinin_class_dict, extend_words_list=[], output_max_length=7,
                         output_min_length=1, equal_length=False, mix_option=False):

        """ input_string >>>輸入欲押韻之字詞(用一個字以上來開始)
        """
        input_string = self._punctuation_cleaner(input_string)
        input_pinin_list = lazy_pinyin(input_string)

        if mix_option == False:
            if input_pinin_list[-1] in default_dict.keys():
                p_len = len(input_pinin_list)
                target_list = []
                for item in default_dict[input_pinin_list[-1]]:
                    if len(item[1]) >= p_len:
                        if input_pinin_list[-1 - p_len + 1:-1] == item[1][-1 - p_len + 1:-1]:
                            if equal_length:
                                if len(item[0]) == output_min_length:
                                    target_list.append(item[0])
                            else:
                                if output_max_length >= len(item[0]) >= output_min_length:
                                    target_list.append(item[0])
                return list(set(target_list))
            else:
                return 'Sorry, no data.'
        else:
            mix_pinin_list = [list(i) for i in self._mix_pinin_list(input_pinin_list)]
            target_list = []
            for l in mix_pinin_list:
                p_len = len(l)
                if l[-1] in default_dict.keys():
                    for item in default_dict[l[-1]]:
                        if len(item[1]) >= p_len:
                            if l[-1 - p_len + 1:-1] == item[1][-1 - p_len + 1:-1]:
                                if equal_length:
                                    if len(item[0]) == output_min_length:
                                        target_list.append(item[0])
                                else:
                                    if output_max_length >= len(item[0]) >= output_min_length:
                                        target_list.append(item[0])
            if target_list:
                return list(set(target_list))
            else:
                return 'Sorry, no data.'

    @staticmethod
    def _punctuation_cleaner(target_string):
        punctuation_mark_list = ['[’!"#$%&\'()*+,-./:;<=>?@[\\]^_`，。{|}~「」＜＞〈〉《》【】（）？：、！+*＊“”]', '\n', '\xa0', ' ',
                                 '\u3000', '\u200b', '\t']
        for item in punctuation_mark_list:
            target_string = re.sub(item, '', target_string)
        return target_string

    def _mix_pinin_list(self, input_pinin_list):
        mix_pinin_list = []
        for item in input_pinin_list:
            mix_pinin_list.append(self._mix_pinin(item))
        m = list(itertools.product(*mix_pinin_list))
        return m

    @staticmethod
    def _mix_pinin(input_pinin):
        mix_pinin_list = []
        input_len = len(input_pinin)
        for i in range(input_len):
            if 'i' == input_pinin[-1 + i:]:
                mix_pinin_list.append('yi')
            mix_pinin_list.append(input_pinin[-1 + i:])
        return mix_pinin_list

# #　使用範例
# P = PininFinder()
# # 單一字詞查找
# P.check_pinin_word(input_string='打架' , output_max_length=5, output_min_length=2, equal_length=False, mix_option=True)

P = PininFinder()

# Create your views here.
def index(request):
    return render(request, 'index.html')

def pinin(request):
    msg = '打架'
    min = 2
    max = 5
    mix = False
    if request.GET['w']:
        msg = request.GET['w']
    if request.GET['l']:
        min = int(request.GET['l'])
    if request.GET['m']:
        if request.GET['m'] == True:
            mix = True
    if request.GET['mm']:
        max = int(request.GET['mm'])
    l = P.check_pinin_word(input_string=msg , output_max_length=max, output_min_length=min, equal_length=False, mix_option=mix)

    return HttpResponse(json.dumps({'msg': l}), content_type="application/json")