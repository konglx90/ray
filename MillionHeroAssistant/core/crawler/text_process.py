# coding:utf8

import jieba.posseg as pseg
import jieba.analyse

'''
initialize jieba Segment
'''


def postag(text):
    words = pseg.cut(text)
    return words

def analyse_tags(content, top_k = 10, with_weight = True):
    """
    Get tags by using TF-IDF

    :param topK:
    :param with_weight:
    :return:
    """
    tags = jieba.analyse.extract_tags(content, topK=top_k, withWeight=with_weight)
    return {
        "tags": [ tag[0] for tag in tags ] if with_weight else tags,
        "tags_with_weight": tags
    }
