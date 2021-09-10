from convert import *
import unittest
class TestStringMethods(unittest.TestCase):
    def setUp(self):
        self.convert = CidrMaskConvert()
        self.validate = IpValidate()

    def test_valid_cidr_to_mask(self):
        self.assertEqual('128.0.0.0', self.convert.cidr_to_mask('1'))

    def test_valid_mask_to_cidr(self):
        self.assertEqual('1', self.convert.mask_to_cidr('128.0.0.0'))

    def test_invalid_cidr_to_mask(self):
        self.assertEqual('Invalid', self.convert.cidr_to_mask('0'))

    def test_invalid_mask_to_cidr(self):
        self.assertEqual('Invalid', self.convert.mask_to_cidr('0.0.0.0'))

    def test_valid_ipv4(self):
        self.assertTrue(self.validate.ipv4_validation('127.0.0.1'))

    def test_invalid_ipv4(self):
        self.assertFalse(self.validate.ipv4_validation('192.168.1.2.3'))


if __name__ == '__main__':
    unittest.main()
