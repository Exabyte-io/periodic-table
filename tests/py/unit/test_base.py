import unittest
from periodic_table import ELEMENT_BONDS, ELEMENT_COLORS, PERIODIC_TABLE

class TestBase(unittest.TestCase):

    def test_periodic_table(self):
        assert PERIODIC_TABLE["H"]["name"] == "Hydrogen"
